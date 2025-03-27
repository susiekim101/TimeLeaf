# TimeLeaf
Track time, grow passions, go green
## Inspiration
After listening to Katya Sutil's inspirational speech about her journey toward working in SpaceX, our teammates discussed our own passions and what drives us forward. We each had unique passions, whether they be singing, dancing, or playing an instrument, but admitted our lack of time to devote toward these passions. Too caught up in our academic work, we struggled to allocate time to further nurture our hobbies and decided to create an application that can help us schedule and track our progress with certain hobbies.

## What it does
Time Leaf begins with a 10-question discovery quiz to get to know the user's personality and interests. We use these results to recommend new, eco-friendly hobbies that the user could pursue. We wanted to allow the user to discover their new passions and break out of their comfort zone but still pertain to their interests by AI-generating suggestions. The user can add their current hobbies or even add new ones based on the AI-generated responses and keep track of how long they've spent on each activity. The home screen helps the user immediately see their progress for each hobby with the Time Leaf mascot, which changes its emotion depending on how long you've spent on each hobby. This UI encourages the user to spent more time on specific hobbies to help improve the mascot's emotions!

## How I built it
We used React and typescript to build the skeleton of our application. We then integrated the Google Gemini API to retrieve the user's interests determined from the discovery quiz and AI-generate eco-friendly hobbies that the user could pursue. Gemini provides a description and a list of resources that the user could use to get started on this new activity. We also used MongoDB for backend integration to keep track of user's list of hobbies and time spent on each.

## Challenges I ran into
This project was our first time attempting to integrate the Gemini API on an application. When we tried to implement it, we found that it would generate repetitive responses and there wasn't a lot of diversity in the three hobbies that it suggested. We were able to resolve this issue by researching better prompt engineering to give Gemini a better idea of the responses we were looking for. We also ran into some problems linking our MongoDB backend with our frontend to accurately track the hours and list of hobbies.

## Accomplishments that I'm proud of
We're proud of being able to integrate the Gemini API in an efficient matter that generates unique hobbies, along with a description that explains how the activity is sustainable. The backend integration also worked to properly store our hobbies in the database and link to a separate timer and log for each hobby.

## What I learned
We learned about the Gemini API and how to utilize its text generation given a dynamic prompt. Some of our team members were also first-time hackers, so they were able to learn about React and using GitHub.
