James W Lee

This simple bookmarking application was submitted as a solo project.

Users can bookmark their favorite sites, add descriptions, follow a link to visit the site, and have the option to delete once they have no further use of the bookmarked site. (no editing extension provided)

User Stories
As a user:

I can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)
I can see a list of my bookmarks when I first open the app

All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

Detailed view expands to additionally display description and a "Visit Site" link
I can remove bookmarks from my bookmark list

I receive appropriate feedback when I cannot submit a bookmark

Check all validations in the API documentation (e.g. title and url field required)
I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection


Use fetch for AJAX calls and jQuery for DOM manipulation

Use namespacing to adhere to good architecture practices

Minimal global variables
Create modules in separate files to organize your code
Logically group your functions (e.g. API methods, store methods...)
Keep your Data out of the DOM

No direct DOM manipulation in your event handlers!
Follow the React-ful design pattern - change your state, re-render your component
Use semantic HTML

Use responsive design

Visually and functionally solid in viewports for mobile and desktop
Follow a11y best practices

Refer back to the lessons on accessibility, forms

