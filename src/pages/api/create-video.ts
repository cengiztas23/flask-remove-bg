import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const tempDir = path.join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
const upload = multer({ dest: tempDir });

export const config = {
  api: {
    bodyParser: false,
  },
};

const runMiddleware = (req: any, res: any, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  try {
    await runMiddleware(req, res, upload.fields([{ name: 'images' }, { name: 'musicFile' }]));

    const files = (req as any).files;
    const body = (req as any).body;
    const overlayText = body.text?.trim() || '';
    const transition = body.transition || 'fade';


    if (!files || !files.images || files.images.length === 0) {
      return res.status(400).json({ error: 'No images uploaded.' });
    }

    const rawImages: string[] = files.images.map((f: any) => f.path);
    const images: string[] = [];

    for (const file of rawImages) {
      const stat = fs.statSync(file);
      if (stat.size === 0) continue;
      const convertedPath = path.join(tempDir, `${uuidv4()}.png`);
      await sharp(file).png().toFile(convertedPath);
      images.push(convertedPath);
    }

    if (images.length === 0) {
      return res.status(400).json({ error: 'No valid images found.' });
    }

    const musicPath = body.musicUrl
      ? body.musicUrl
      : path.join(process.cwd(), 'public', 'music', body.music || 'chill.mp3');

    const tempVideos: string[] = [];
    const durationPerImage = 3;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const videoPath = path.join(tempDir, `${uuidv4()}.mp4`);

      const filters = [
  'scale=1280:720:force_original_aspect_ratio=decrease',
  'pad=1280:720:(ow-iw)/2:(oh-ih)/2',
];

if (transition === 'fade') {
  if (i > 0) filters.push('fade=t=in:st=0:d=1');
  filters.push(`fade=t=out:st=${durationPerImage - 1}:d=1`);
}

      await new Promise((resolve, reject) => {
        ffmpeg(img)
          .loop(durationPerImage)
          .fps(25)
          .videoFilters(filters)
          .outputOptions('-pix_fmt yuv420p')
          .output(videoPath)
          .on('end', () => {
            tempVideos.push(videoPath);
            resolve(true);
          })
          .on('error', (err) => reject(err))
          .run();
      });
    }

    const listFilePath = path.join(tempDir, `${uuidv4()}.txt`);
    fs.writeFileSync(listFilePath, tempVideos.map((v) => `file '${v}'`).join('\n'));

    const mergedVideo = path.join(tempDir, `merged-${Date.now()}.mp4`);
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(listFilePath)
        .inputOptions(['-f', 'concat', '-safe', '0'])
        .outputOptions('-c copy')
        .output(mergedVideo)
        .on('end', () => resolve(true))
        .on('error', (err) => reject(err))
        .run();
    });

    const finalOutput = path.join(tempDir, `final-${Date.now()}.mp4`);
const ff = ffmpeg()
  .input(mergedVideo)
  .input(musicPath)
  .outputOptions(['-shortest', '-pix_fmt', 'yuv420p']);

if (overlayText && overlayText.length > 0) {
  console.log('Overlay text:', overlayText); // kontrol et
  ff.videoFilter(`drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='${overlayText}':fontcolor=white:fontsize=36:x=(w-text_w)/2:y=h-th-20:box=1:boxcolor=black@0.5:boxborderw=10`);
}

await new Promise((resolve, reject) => {
  ff.output(finalOutput)
    .on('end', () => resolve(true))
    .on('error', (err) => {
      console.error('❌ Final FFmpeg hatası:', err.message);
      reject(err);
    })
    .run();
});


    const stream = fs.createReadStream(finalOutput);
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename=output.mp4');
    stream.pipe(res);
  } catch (err) {
    console.error('💥 Server error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Unexpected server error.' });
    }
  }
};

export default handler;
