
// Simulate clearing library
const userKey = "aditya_user";
const currentUser = localStorage.getItem(userKey);

if (currentUser) {
    const user = JSON.parse(currentUser);
    // Reset library to empty
    user.library = [];
    localStorage.setItem(userKey, JSON.stringify(user));
    console.log("Library cleared for user:", user.email);
} else {
    console.log("No user found to clear.");
}
