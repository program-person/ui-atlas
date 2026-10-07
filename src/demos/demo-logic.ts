export const MAX_NOTE_LABEL_LENGTH = 12;

export function validateNoteLabel(value: string): string {
  const label = value.trim();
  if (!label) return 'ノートのラベルを入力してください。';
  if (Array.from(label).length > MAX_NOTE_LABEL_LENGTH) return `${MAX_NOTE_LABEL_LENGTH}文字以内で入力してください。`;
  return '';
}
