=== crossroads
I eventually awoke as natural light returned. The industrial groans of the tunnel had long faded into the distance, and the train was about to exit out into... somewhere.
At first the light temporarily blinded me as we crossed the threshold. Once my eyes adjusted, a completely new landscape stretched out before me. Completely flat, the ground composed of a grey sand extending into the distance, at which point dark stone mountains shot up so high into the sky that I was forced to look up to see the top. # pause
As if in contrast, the railroad tracks passed alongside a small wooden shack that featured a gate blocking the train from progressing any further. As the train and I pulled up beside the shack, an elderly man in a well-pressed uniform emerged to greet me. The sight of another sane person already felt so unusual, and at first I was not sure how to converse with him. # pause
The old man greeted me.
"Well, good day young one. What brings you all the way out here?"
-> question_loop
= question_loop
~ temp learned_job = false
* ["Everyone started screaming."]"I left the City. People just fell to the ground and started screaming. They did not stop for days. There was nothing left there for me."
    The old {learned_job: {~man|attendant}|man} chuckled with great heart, his round glasses sliding down his nose. Once finished having a good laugh, he pushed them back up his face.
    "Yes, I am not surprised. It was bound to happen eventually. Why am I not surprised?"
    ** "You think it's funny?"[] I spat, "my family is screaming in pain right now!"
        "Oh, I am sorry. I meant no offense. I used to live in the City too, and knew plenty of people there. But once you get to my age, most everything starts to seem trivial, you know?"
        Somehow, I could not stay angry at the strange {learned_job: {~man|attendant}|man}. -> question_loop
    ** ["How did you know?"]"How in the world would you have known this would happen?"
        "Living this long, doing this job. It makes you wise about how the world works. I have met many people in far stranger situtations than yours, not to undermine what you must have experienced."
        Part of me was curious what other things he may have seen, but I quickly reconsidered asking given that my own experience had already been almost too much to bear.
        -> question_loop
* ["Who are you?"]"Who are you?" I asked.
    "Oh yes! I almost forgot. I am..." the old man paused for a concerning stretch of time.
    "Well, I seem to have forgotten my name. This is most unusual. Perhaps I shouldn't rule out retiring after all."
    There was nothing I could respond to that.
    ~ learned_job = true
    "Anyway, I am the crossroads attendant for the crossroads station you now sit at. Beautiful place, isn't it?"
    I suppose it was. The sun - the real one - shone a great warmth on me like nothing in the City ever had. This place felt real, not haunted by centuries of the inexplicable.
    -> question_loop
* ["You're... normal?"]"You're not affected by the screaming?"
    The old {learned_job: {~man|attendant}|man} at first gave me a strange expression, but quickly changed to a broad smile as if he remembered what I was talking about.
    "Oh, of course not. I learned not to let stuff like that bother me long ago. You on the other hand look like you've seen a ghost. Why aren't you the one screaming?"
    I could not answer that one.
    -> question_loop
* ["What are you doing out here?"]"I've never seen this place before. What are you doing out here?"
    "I'm in charge of the crossroads station. It's my job to make sure the trains get to whatever plane they need to reach. It's rewarding, if a little lonely. You are actually the first person I've seen for months, and the trains usually are not very talkative."
    ~ learned_job = true
    I corrected him, "The trains can't talk."
    The old {learned_job: {~man|attendant}|man} shook his head.
    "They do. They just don't like you city folk very much."
    -> question_loop
* ->
"To me," the old {~man|attendant} continued, "it seems like you're running away. I know it's not really my place to ask, but my wife used to be a psychologist so I'm curious about this sort of thing. Why are you running?"
-> psych_test
= psych_test
* "What?"[]
    "Oh, I can tell young one. The screaming plague might be the final straw, but it's never enough on its own to make someone leave home like you have."
    His smile felt genuine, and I felt little reason to be defensive.
    -> psych_test
* "I needed a new life.["] I felt like nothing in the City. The dangers, it never felt like other people were bothered by them like I was. It was as if I was never strong enough to live with them. The screaming was the worst one so far, I couldn't stand it."
    -> post_psych
* "Everything was so busy.["] I couldn't keep up with the constant threats, the new dangers that would arrive more and more frequently. Every day was more and more hostile to my very existence. The screaming was the final straw." 
    -> post_psych
= post_psych
"Yes, there is always a reason." the old {~man|attendant} responded.
His prying struck a nerve within me. He was right. There was more to me leaving than there being nothing left in that godforsaken place.
"Why don't you come inside? This train isn't set to leave for another hour, and you look like you could use some food."
I was too hungry to complain. # pause
The crossroads attendant and I talked for what felt far longer than an hour. He told me stories about the others he had encountered using the trains as a way to escape. There were all sorts of people: criminals; those abused by their families; some haunted by incomprehensible visions of beings beyond understanding.
"You see," he said to me, "for almost everyone who feels the need to run away, there is a perfectly good reason for them to do so. But it's not always the best decision on their part. It's not my place to tell them otherwise, so I equip them with what they need to survive the journey ahead. You may not believe me, but there are things out there worse than anything in the cities." # pause
The old man gave me some food and an old canvas sleeping bag that was equipped with neurological shielding. He insisted it was important to have when night fell.
~ add_inventory(Food)
~ add_inventory(SleepingBag)
->->