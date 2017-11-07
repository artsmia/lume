# What's in a name?

_Carl Peaslee_

>_What's in a name? That which we call a rose  
By any other name would smell as sweet._  
>**Romeo and Juliet (II, ii, 1-2)**

You'll have to excuse me for getting a bit literary, but as a developer with an MFA in Creative Writing, I'm always intrigued by Computer Science and Writing's shared interest in word choice and nomenclature.

If Shakespeare is the most quoted writer when it comes to naming things, than it is probably the programmer Phil Karlton who is most often cited in computer science with regard to word choice:

> “The only real difficulties in programming are cache invalidation and naming things.”

In Juliet's famous profession of love to Romeo, we hear her cast aside the importance of individual words. But if we are to listen to Phil Karlton or pay attention to the outcome of Romeo and Juliet (–– or if you have any experience reading other people's code) you'll know that how we choose to name things is not only immensely important but also really really hard.

Interestingly, the Mia-storytelling project has been packed full of interesting debates on what to call things.

In fact, the current name "Mia-storytelling" is a recent, albeit temporary, christening. The previous iteration of the product had operated under the moniker "griot" (pronounced gree-oh), after the African storyteller –– a result of the application's original use as an extension of a new exhibit on African art.

"Griot", the name, though clever, concise, and unique was a bit academic. Its most damning quality, however, was that it was extremely difficult to pronounce when read ("...Gee-Riot?") and equally difficult to spell when heard (_g-r-???-o-???_).

We brainstormed a bit but were having difficulty. We couldn't call our application art-stories... because what if a user wanted to make a story for an image that wasn't art? And we couldn't call it museum stories... because we didn't want to scare off institutions that weren't technically museums! What about just "Mia-stories"? Oooh, no! That's the name of Mia's blog!

While we haven't been able to come up with a clever or catchy name for the tool yet, Mia Storytelling tells it like it is-- and for now, that will have to do (stay tuned for a follow up post on the naming exercise conducted to come up with a name).

Later, I ran into another interesting problem with names.

At the core of the application, we are allowing users to create records in our database that correspond to various images, works of art, sculptures, artifacts, and objects.

So what should we call those "things"? They weren't even technically all things! "Art" or "Arts" sounded silly. Not to mention there is a fiercely raging and never ending debate on what, exactly, art is –– a matter I'd personally like to stay clear of.

"Artifacts" was also a no-go because of its connotations. And then "Stuff" just sounded stupid.

Thankfully, the curators here at Mia have reached a sort of truce and landed on a term that's almost always accurate, concise, and about as inoffensive as they come: "object".

Van Gogh's _Olive Trees_? It's an object! Coffin of Lady Tashat? You guessed it, it's an object, too!

The phrase "object" was perfect! –– at least until my friend Javascript and I got involved. There aren't too many forbidden or "reserved words" in the javascript language but unfortunately "Object" is definitely one of them. Even "object" with a lower-case O would have been alright. But unfortunately, the React framework requires us to capitalize any variable that represents a component!

(Sidenote: In Javascript, an "Object" is a type of data which reflects an unordered series of key-value pairs (eg. {petName: "Grilled Cheese", species: "cat", coloring: "Tuxedo"}). Even more confusing, objects are sometimes referred to as "maps" or "dictionaries" in other programming languages!)  

I won't bore you with any more specific programming snafus but suffice to say, I decided to make an executive decision and start referring to all of the "stuff" in the application's codebase –– be they "arts", sculptures, artifacts, photos, sarcophagi, or descriptions of purely conceptual works of dance ––  as simply "items".

Perhaps, before the application officially launches, I'll make the curators happy and go through the application and change all of the references to "item" on the frontend to "object". But for right now, for the sake of my sanity, everything is an item.
