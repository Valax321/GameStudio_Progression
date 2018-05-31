=== city
The screams of millions could be heard for miles. As soon as the electricity went out for the last time the suffering started and continued without respite. It seemed random; men, women and children screaming in... agony? Fear? The rest of us did not know. What I did know however was that it was time for me to leave. I packed what little I could carry into a bag and left my family writhing and whimpering on the floor. # pause
%drawGraphic: assets/graphics/city_scene.png, 100, 100
The City always disgusted me. Vast towers of flat grey rock stretching to impossible heights; plains of concrete of unknown purpose twisted and melting between the towers and places unseen. I never figured out if it was just me, or if everyone else felt this way too. Maybe screaming was not such an unusual reaction after all. # pause
I spent time just walking down the streets, considering what to do with myself. Getting free of this place was essential. The best way to do that was by train. That meant going underground. # pause
%drawGraphic: assets/graphics/garbage_crush.png, 41, 188
One distinct scream could be heard emanating from the steps down to the station. On approach I encountered a man, presumably afflicted with the screaming from the absent look in his eyes. It was not immediately clear however, given that he had managed to pin his leg under one of the heavy stone garbage bins that fell over.
* [I helped the man.]The bin was heavy but it was possible to roll it to the side. The leg was crushed and twisted at an impossible angle, but removing the bin made no change to the man's behaviour: he continued screaming uninterrupted, now able to writhe even more violently. What could they be experiencing to make such physical trauma meaningless in comparison? # pause
    -> done_helping
* [I left the man.]After a moment's thought, it was clear he was gone too. Walking away felt wrong, but there was no desperation or cry for help from the man. He was not even aware I was here. # pause
    -> done_helping
= done_helping
Apart from the Great Spotlight seeping in from outside, there was no lighting inside the train station. That had stopped working long ago. The trains were barely used since then, but it was impossible to get rid of them. They were stronger than us, and could tunnel anywhere.
* {check_inventory(Torch)}[I used the glow rod in my backpack.]The light from the glow rod was dim, but just bright enough to see the scum-coated surfaces.
    -> station
* [I went into the station blind, feeling my way around.]I hugged a wall to prevent myself from getting disoriented. The surface was covered in a powdery-feeling substance that smelled wrong. I refused to let myself think about what it was. 
    -> station_dark

= station
The station appeared to be empty: not even a train was stopped here. They must be able to sense something dreadfully wrong with reality in order to not be on schedule. 
I stepped down onto the coarse gravel and stood beside the tracks.  # pause
All I could occupy myself with while waiting was staring down the tunnel and out into the darkness in which we were forbidden to go by foot. The train tunnels were not a place for humanity, and the trains were the only force that kept us safe while travelling them. Even when safe, the sounds of metallic groaning and scrapes coming from the earth itself disturbed even the strongest willed of us in transit. We were happy once we could stop using trains. # pause
I cannot recall how long I waited, but it felt like hours. The Great Spotlight had progressed to a more orange tint when I saw the bright white headlight beams of a train in the tunnel ahead. Initially I felt some limited joy, but that quickly faded at the sight of a small flatbed train pulling to a stop in front of me. Of course, they sent a cargo train. # pause
-> on_train
= station_dark
Movement was slow through the station, and a rising discomfort began emerging from deeper within. I edged my way along the outer wall until I found a pillar, a sign that I had reached the middle of the station. From here I turned and forced myself onwards into the darkness, encountering a small drop below. Down here was the ballast of the railway tracks, where people used to wait to catch the trains.
TODO: more here
-> on_train
= on_train
%drawGraphic: assets/graphics/train_bored.png, 100, 100
It was still better than waiting some more, and certainly better than going on foot. I picked my bag back up and climbed the steps, before finally taking a seat among the crates and boxes the small train was carrying. As soon as I was seated, we accelerated on down the tunnel and I attempted to ignore the noise of unseen mechanical horrors working just outside my vision. # pause
There was little to do while we moved down the tunnel, and I found myself parched and hungry. While I had no food, I did have my water bottle, from which I drank half the liquid and felt somewhat better. After that, there was little to do but rest.
~ remove_inventory(WaterbottleFull)
~ add_inventory(WaterbottleHalf)
%drawGraphic: assets/graphics/train_bored2.png, 100, 100 # pause
->->