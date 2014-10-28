nourriture-platform
===================

Repository for the Nourriture platform.

The Nourriture platform is the backend of our system. It provides REST API to developers.

Please, refer to the architecture diagram
(http://tinyurl.com/qattlat).

#### Platform API
	┌────────┬────────────────────────┬──────────────────────────┐
	│        │ Name                   │ Path                     │
	├────────┼────────────────────────┼──────────────────────────┤
	│ POST   │ postcompany            │ /company/                │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getcompany             │ /company                 │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getcompanyid           │ /company/:id             │
	├────────┼────────────────────────┼──────────────────────────┤
	│ PUT    │ putcompanyid           │ /company/:id             │
	├────────┼────────────────────────┼──────────────────────────┤
	│ DELETE │ deletecompanyid        │ /company/:id             │
	├────────┼────────────────────────┼──────────────────────────┤
	│ POST   │ postrecipe             │ /recipe/                 │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getrecipe              │ /recipe                  │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getrecipeid            │ /recipe/:id              │
	├────────┼────────────────────────┼──────────────────────────┤
	│ PUT    │ putrecipename          │ /recipe/:name            │
	├────────┼────────────────────────┼──────────────────────────┤
	│ DELETE │ deleterecipeid         │ /recipe/:id              │
	├────────┼────────────────────────┼──────────────────────────┤
	│ PUT    │ putrecipeid            │ /recipe/:id              │
	├────────┼────────────────────────┼──────────────────────────┤
	│ POST   │ postingredient         │ /ingredient/             │
	├────────┼────────────────────────┼──────────────────────────┤
	│ PUT    │ putingredientid        │ /ingredient/:id          │
	├────────┼────────────────────────┼──────────────────────────┤
	│ DELETE │ deleteingredientid     │ /ingredient/:id          │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getingredient          │ /ingredient              │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getingredientid        │ /ingredient/:id          │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getingredientname      │ /ingredient/:name        │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getingredientcompanyid │ /ingredient/:companyId   │
	├────────┼────────────────────────┼──────────────────────────┤
	│ POST   │ postgastronomist       │ /gastronomist/           │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getgastronomist        │ /gastronomist            │
	├────────┼────────────────────────┼──────────────────────────┤
	│ GET    │ getgastronomistid      │ /gastronomist/:id        │
	├────────┼────────────────────────┼──────────────────────────┤
	│ PUT    │ putgastronomistid      │ /gastronomist/:id        │
	├────────┼────────────────────────┼──────────────────────────┤
	│ DELETE │ deletegastronomistid   │ /gastronomist/:id        │
	└────────┴────────────────────────┴──────────────────────────┘
