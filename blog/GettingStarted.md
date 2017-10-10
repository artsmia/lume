# Getting Started

My first week of development here at Mia is in the books where I've been tasked with helping Mia create a reboot of their interactive storytelling application, Art Stories. The project received generous support from the [Knight Foundation](https://knightfoundation.org/) to pursue the expanded, user-friendly tool and are hopeful that other institutions can use the tool to bring their collections to life.

As we move through the development process over the next year, I'll be writing periodic updates on our progress. My goal is to make these posts relevant to both technical and non-technical readers alike as I attempt to fulfill both of our grant's goals –– not just to create a storytelling application for fellow museums –– but to also effectively chronicle the creative process both through regular blog posts and a well-documented, open source code repository.

In order to cater to an audience of widely varying technical skills, I'll try to designate any techno-talk with blockquotes so that a non-technical reader can simply skip past the jargon without missing out on other interesting information. For example:

>We've decided to build the application as a fullstack javascript application. The Next.js / React frontend, powered by Apollo, will connect to a Graphql enabled Node server with a SQL database.


See that wasn't so bad! Now let's talk about the project!

## The Project

At its core, this project is composed of three central elements.

- __"Storytelling Application"__: An open source rebuild of the original "Griot" storytelling application https://artstories.artsMia.org/#/
- __"Custom CMS"__: A new, more approachable, content management system for the application (decoupled from Wordpress)
- __"Open Source Project"__ A thoroughly documented process and codebase.

The old version of the Storytelling Application, originally named Griot, after a mythological African storyteller was built, appropriately, to accompany a new exhibit of African art.

The initial goal was to enhance museum-goers in-gallery experience with a seamless web-based application which they could access from iPad's strategically placed throughout the museum. The content was designed to provide guests with accessible and interesting information that expand on the didactics already present in the gallery by providing interactive features which would allow guests to create connections with and between the works in new and memorable ways.

Within Mia, the original Storytelling Application has, for the most part, been considered a big success. Curatorial staff has been enthusiastic about creating high-quality, accessible content; surveys of museum-goers who interacted with the Storytelling Application showed that they retained information they'd learned from using the app months after they'd visited; and educational staff have found ways to adapt the application for new and exciting purposes.  

Unfortunately, however, the existing CMS (a somewhat unwieldy custom Wordpress plugin) has created headaches on the content creation side and the aging codebase (many of whose architects are no longer with Mia) is sparsely documented and difficult to maintain –– let alone improve.

>The current Storytelling App is an Angular 1.x app that pulls data from a giant json blob that gets created by the old CMS which was also built with Angular as a Wordpress plugin.  

Despite these challenges, Mia has been able to help several other institutions who've grown interested in the Storytelling Applications adapt and implement the tool for their own unique use-cases. A large part of the Knight grant is to continue to rework the Storytelling App and CMS so that other institutions can leverage the application –– even with minimal technical staff. The ultimate hope is that by creating a well-documented, public codebase, other institutions with greater technical capabilities will eventually help maintain and expand upon the application by contributing to the open-source.   

Hopefully this article has helped provide some context about about Mia's Storytelling Application. Moving forward, I intend for these articles to not only document the process but to also serve as a space to reflect on the various challenges we've faced and decisions we've made.
