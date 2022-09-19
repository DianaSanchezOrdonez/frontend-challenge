# CHALLENGE FRONT END DEVELOPER

This project has been deployed with the following url: https://cheery-marzipan-6a48d8.netlify.app/ 

## STACK
- Library [React](https://reactjs.org/)
- HTML/CSS for building the UI components
- Netlify for deploying

## API
- [Hackers News public API](https://hn.algolia.com/api)
- We apply the follow query for getting the data:
  
  ` https://hn.algolia.com/api/v1/search_by_date?query=${technology}&page=${page} `

## FUNCTIONALITY
- The selected filter should persist on the local storage
- The favorited posts should persist on the local storage
- The web app is expected to work as a responsive web application
- If you decide to implement the pagination component, it should behave like this
one: https://material-ui.com/components/pagination/
- When clicking on the row, a new tab should be open with the link of the post
(story_url)
- Clicking on the “like button” should not trigger the opening of the post URL link
- When hovering on the row, apply opacity to the entire row and its children (texts,
icons, like button, etc)

