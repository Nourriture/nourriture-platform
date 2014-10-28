nourriture-platform
===================

Repository for the Nourriture platform.

The Nourriture platform is the backend of our system. It provides REST API to developers.

Please, refer to the architecture diagram
(http://tinyurl.com/qattlat).

#### Platform API

	┌────────┬───────────────────────────┬──────────────────────────┐
	│        │ Name                      │ Path                     │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ POST   │ postcompany001            │ /company/                │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getcompany001             │ /company                 │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getcompanyid001           │ /company/:id             │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ PUT    │ putcompanyid001           │ /company/:id             │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ DELETE │ deletecompanyid001        │ /company/:id             │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ POST   │ postrecipe001             │ /recipe/                 │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getrecipe001              │ /recipe                  │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getrecipeid001            │ /recipe/:id              │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ PUT    │ putrecipename001          │ /recipe/:name            │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ DELETE │ deleterecipeid001         │ /recipe/:id              │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ PUT    │ putrecipeid001            │ /recipe/:id              │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ POST   │ postingredient001         │ /ingredient/             │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ PUT    │ putingredientid001        │ /ingredient/:id          │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ DELETE │ deleteingredientid001     │ /ingredient/:id          │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getingredient001          │ /ingredient              │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getingredientid001        │ /ingredient/:id          │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getingredientname001      │ /ingredient/:name        │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getingredientcompanyid001 │ /ingredient/:companyId   │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ POST   │ postgastronomist001       │ /gastronomist/           │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getgastronomist001        │ /gastronomist            │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ GET    │ getgastronomistid001      │ /gastronomist/:id        │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ PUT    │ putgastronomistid001      │ /gastronomist/:id        │
	├────────┼───────────────────────────┼──────────────────────────┤
	│ DELETE │ deletegastronomistid001   │ /gastronomist/:id        │
	└────────┴───────────────────────────┴──────────────────────────┘
