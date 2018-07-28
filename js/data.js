
var scenes = [{
    number : 0,
    name : "Overview by Country",
    subtitle : "Overall Satisfaction",
    active : true,
    showmap : true
}, {
     number : 1,
     name : "What factors are considered",
     subtitle : "Household net financial wealth in usd",
     active : false,
     showmap : false
}, {
    number : 2,
    name : "What factors are considered",
    subtitle : "Labour market insecurity as pct",
    active : false,
    showmap : true
},{
    number : 3,
    name : "What factors are considered",
    subtitle : "Employment rate as pct",
    active  : false,
    showmap : true
}, {
    number : 4,
    name : "What factors are considered",
    subtitle : "Personal earnings in usd",
    active  : false,
    showmap : true 
}, {
    number : 5,
    name : "What factors are considered",
    subtitle : "Air pollution in ugm3",
    active  : false,
    showmap : true 
}, {
    number : 6,
    name : "What factors are considered",
    subtitle : "Water quality as pct",
    active  : false,
    showmap : true
}, {
    number : 7,
    name : "What factors are considered",
    subtitle : "Self-reported health as pct",
    active  : false,
    showmap : true 
}, {
    number : 8,
    name : "What factors are considered",
    subtitle : "Homicide rate as rat",
    active  : false,
    showmap : true    
}]

var series_pallet = [
    ["red","yellow", "green"],
    ['gray','yellow','green'],
    ['green','yellow','gray'],
    ['gray','yellow','green'],
    ['gray','yellow','green'],
    ['gray','yellow','green'],
    ['gray','yellow','green'],
    ['gray','yellow','green'],
    ['gray','yellow','green']
]

var annotations = [
    {page : 1, scene : 0,px : 'Finland',py:8,opacity : 1,text:"Countries in the top end of satisfaction ratings, tend to be Nothern European"},
    {page : 1, scene : 0,px : 'Turkey',py:6.5,opacity : 1,text:"Countries in the lower end of satisfaction ratings, tend to be Southern and E. European"},
    {page : 2, scene : 1,px: 'Germany' ,py:160000,text:"USA appears to represent a significant outlyer"},
    {page : 2, scene : 2,px: 'Spain' ,py:20,text:"S. Africa, Greece and Spain stand out with higher rates"},
    {page : 2, scene : 8,px: 'France',py : 20, text : "Homicide rates are generally low with a few clear exceptions namely, Brazil, Russia, Mexico and S. Africa"},
    {page : 3, scene : 1,px: 6.25,py : 140000, text : "A slight positive correlations appears to exist with this factor"},
    {page : 3, scene : 2,px: 6.25,py : 18, text : "and here a stronger negative correlations appears to exist with this factor"},
    {page : 3, scene : 3,px: 6.25,py : 80, text : "A relatively strong positive correlations appears to exist with this factor"}
]

var scene = 
[
    ["South Africa",4.8,17042,26.5,43,11554,22,69,67,10  ],
    ["Greece",5.2,18117,17.4,52,25124,18,69,74,1  ],
    ["Portugal",5.2,31877,6.5,65,24529,10,87,46,1  ],
    ["Hungary",5.3,23289,4.8,67,21711,19,76,56,1.2  ],
    ["Turkey",5.5,4429,13,51,22848,20,63,66,1.7  ],
    ["Estonia",5.6,16967,4,72,23621,8,82,51,3.1  ],
    ["Slovenia",5.8,20048,4,66,34965,16,89,65,0.6  ],
    ["Italy",5.9,64019,8.1,57,35397,18,71,66,0.8  ],
    ["Japan",5.9,97595,1.5,74,39113,14,86,35,0.3  ],
    ["South Korea",5.9,33495,2.4,66,32399,28,78,33,1.1  ],
    ["Latvia",5.9,17105,6.8,69,22389,11,77,46,6.6  ],
    ["Poland",6,14997,4.3,65,25921,22,80,58,0.8  ],
    ["Russia",6,2260,3.6,70,22101,15,54,43,11.3  ],
    ["Slovak Republic",6.1,10846,6.7,65,23508,21,82,66,0.8  ],
    ["France",6.4,59479,5,65,42992,13,82,68,0.6  ],
    ["Spain",6.4,35443,17.3,60,37333,11,73,72,0.6  ],
    ["OECD - Total",6.5,90570,4.9,67,44290,14,81,69,3.6  ],
    ["Czech Republic",6.6,24258,1.8,72,23722,20,87,61,0.8  ],
    ["Mexico",6.6,4750,4.6,61,15311,16,67,66,17.9  ],
    ["Brazil",6.6,7102,4.9,64,14024,10,72,70,27.6  ],
    ["Chile",6.7,21409,8.1,62,28434,16,69,57,4.5  ],
    ["United Kingdom",6.7,83405,2.6,74,42835,11,85,70,0.2  ],
    ["Belgium",6.9,104084,4.8,62,49587,15,84,75,1  ],
    ["Luxembourg",6.9,74141,3.2,66,62636,12,85,70,0.6  ],
    ["USA",6.9,176076,3.8,69,60154,10,84,88,4.9  ],
    ["Austria",7,59574,2.7,72,48295,16,93,70,0.4  ],
    ["Germany",7,57358,2,75,46389,14,93,65,0.4  ],
    ["Ireland",7,43493,2.1,65,51681,7,82,82,0.6  ],
    ["Israel",7.2,61805,2.6,69,34023,21,67,84,1.7  ],
    ["Australia",7.3,57462,4.3,72,52063,5,92,85,1  ],
    ["Canada",7.3,85758,3.9,73,48403,7,91,88,1.4  ],
    ["New Zealand",7.3,52718,4.9,76,39397,5,90,88,1.3  ],
    ["Sweden",7.3,90708,5.7,76,42816,6,95,80,1  ],
    ["Netherlands",7.4,90002,2.1,75,52833,14,93,76,0.6  ],
    ["Denmark",7.5,73543,2.3,75,52580,9,94,72,0.7  ],
    ["Finland",7.5,27972,2.7,69,42127,6,94,70,1.4  ],
    ["Iceland",7.5,64398,2.6,86,55984,3,99,76,0.9  ],
    ["Norway",7.5,20347,2.7,74,53643,5,96,78,0.6  ],
    ["Switzerland",7.5,128415,1.8,80,60124,15,96,80,0.5  ]
  ]