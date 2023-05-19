export const isRelatedInput = (userInput:string) => {
    // List of keywords related to car detailing services
    const relatedKeywords = [
      "car detailing",
      "car wash",
      "interior cleaning",
      "exterior cleaning",
      "paint protection",
      // Add more related keywords as needed
    ];
  
    // Convert user input to lowercase for case-insensitive comparison
    const lowercasedInput = userInput.toLowerCase();
  
    // Check if any of the related keywords are present in the user input
    for (const keyword of relatedKeywords) {
      if (lowercasedInput.includes(keyword)) {
        return true; // User input is related
      }
    }
  
    return false; // User input is unrelated
}
export const isWelcomText = (userInput:string) => {
    // List of keywords related to car detailing services
    const relatedKeywords = [
      "hi",
      "how are you"
      // Add more related keywords as needed
    ];
  
    // Convert user input to lowercase for case-insensitive comparison
    const lowercasedInput = userInput.toLowerCase();
  
    // Check if any of the related keywords are present in the user input
    for (const keyword of relatedKeywords) {
      if (lowercasedInput.includes(keyword) && lowercasedInput.trim().length <=15) {
        return true; // User input is related
      }
    }
  
    return false; // User input is unrelated
}