export function formatTime(seconds: number, fullForm: boolean = true): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
  
    if (fullForm) {
      return `${minutes} minute(s) and ${remainingSeconds} second(s)`;
    } else {
      return `${minutes}min ${remainingSeconds}sec(s)`;
    }
  }