export const log = {
  error: (info: string) => {
    if (process.env.NODE_ENV !== 'production') {
      const infoPrefix = '[schema form warning]:';
      console.error(`${infoPrefix} ${info}`);
    }
  },
};
