export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long" as const, // Explicitly cast to the correct type
    };
    return date.toLocaleDateString("en-US", options);
  };