# vvill.dev
My personal website. Statically compiled by Hugo and handwritten by Will Garrison. For more information about this repository, read my project analysis [here](https://vvill.dev/projects/website).

## Navigating the Repository
This is a Hugo site. For those unfamiliar, I will describe the use cases of the various files and directories you'll find.

- **static**: This directory will be dumped into the root of the public directory upon build. Files like stylesheets, scripts, and images will all be here for direct referencing

- **content**: This directory contains all the markdown files that hold the "content" for my website. Each markdown file is converted to html and wrapped in the *layouts*, before being put in the public directory.
    - **_index.md**: These files fill in content for the index.html files, or act to provide more metadata about a specific directory (or *section* in hugo terms). 

- **layouts**: This directory contains the html files that wrap around the content generated from the markdown documents. They use hugo methods and variables wrapped in {{ two curly bracets }} to tell our mighty assembler how to use the particular layout. 
    - Some parts are pretty straightforward like `{{ .Content }}`, which denotates the location for Hugo to throw all the content converted from the markdown file, and some parts are a bit more like code like the begining of `partials/head.html` where I create variables to decide what to put for the title and description of each page.
    - **_default**: This directory contains 3 files that act as the main content-wrappers. `baseof.html` is wrapped around every page on the site, while `single.html` and `list.html` are placed inside of that to wrap around the content for indivdual pages, and section indexes respectivly. The homepage is wrapped inside of `baseof.html`, but is devined as `index.html` outside of the `_default` directory.
    - **partials**: This directory acts as a parts bin for frequently used chunks of html. I use three. `head.html` builds the `<head>` section of a page, `footer.html` builds the footer, and `card.html` builds those cards that I use for holding all the posts in a particular section of my website (about, projects, blog). These are referenced in the other html files as `{{ partial x.html . }}` where the . is the context given for it to pull variables from.

- **config.yaml**: This file holds the overal configuration for the hugo site. This cascades down to every page, but some values can be overwritten by markdown frontmatter (yaml surronded by a line of `---`).

## Acknowledgements
This website directly relies on the following projects/pieces of media:
- [Hugo](https://gohugo.io), the static site generator
- Fonts by [Joe Prince](https://fonts.google.com/specimen/Varela+Round) and [Mark Simonson](https://fonts.google.com/specimen/Anonymous+Pro)
- Social Icons by [Freepik](https://www.flaticon.com/authors/freepik)

## Licenses
All `code`, including all html, css, js, and yaml files, are licensed under the GNU General Public License. You can read that in the LICENSE.GPL file.

All `content`, including all images and markdown files, are licensed under the Creative Commons Attribution Share Alike license. You can read that in the LICENSE.CCASA file.