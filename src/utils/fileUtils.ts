export const saveToTextFile = (cards: Array<{question: string, answer: string}>) => {
  const content = cards.map(card => `Soru: ${card.question}\nCevap: ${card.answer}`).join('\n\n');
  
  // Create a blob with the content
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'flashcards.txt';
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};