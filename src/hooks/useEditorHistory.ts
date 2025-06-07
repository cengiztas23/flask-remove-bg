import { useState } from 'react';

// Bu arayüzü mutlaka sayfanla birebir uyumlu yap
export interface EditorState {
  blur: number;
  brightness: number;
  contrast: number;
  effect: 'none' | 'grayscale' | 'sepia';
  flipped: boolean;
  scale: number;
}

export function useEditorHistory(initialState: EditorState) {
  const [editorState, setEditorState] = useState<EditorState>(initialState);
  const [history, setHistory] = useState<EditorState[]>([]);
  const [redoStack, setRedoStack] = useState<EditorState[]>([]);

  const updateEditorState = (partial: Partial<EditorState>) => {
    setHistory((prev) => [...prev, editorState]);
    setRedoStack([]); // yeni işlem yapıldığında ileri geçmiş temizlenir
    setEditorState((prev) => ({ ...prev, ...partial }));
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack((prev) => [editorState, ...prev]);
    setHistory((prev) => prev.slice(0, -1));
    setEditorState(previous);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory((prev) => [...prev, editorState]);
    setRedoStack((prev) => prev.slice(1));
    setEditorState(next);
  };

  const canUndo = history.length > 0;
  const canRedo = redoStack.length > 0;

  return { editorState, updateEditorState, undo, redo, canUndo, canRedo };
}
