// Travel Group Options
export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '🧑',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '👫',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adventurers',
    icon: '👨‍👩‍👧‍👦',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '🧑‍🤝‍🧑',
    people: '5 to 10 People',
  },
];

// Budget Options
export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💸',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balance between comfort and cost',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Premium experiences and comfort',
    icon: '💎',
  },
];
// export const AI_PROMPT = "Generate a complete travel plan for Location: {location}, for {totalDays} days for {traveler}, with a {budget} budget. Include a list of 4 hotel options near my travell location with \"HotelName\", \"HotelAddress\", \"Price\", \"HotelImageURL\", \"GeoCoordinates\", \"Rating\", and \"Description\". Also provide an itinerary structured day-wise, where each day has a \"day\" and a \"plan\" array. Each \"plan\" must contain at least 3 to 4 places, and each place must include \"PlaceName\", \"PlaceDetails\", \"PlaceImageURL\", \"GeoCoordinates\", \"TicketPricing\", \"TravelTime\", and \"time\" representing the best time to visit as a range (e.g., \"9:00 AM - 10:30 AM\"). Return the result in JSON format. Do NOT include any comments, explanations, or extra text before or after the JSON. All keys and string values MUST use double quotes. Do NOT use trailing commas. Do NOT include placeholder text or instructions like \"Replace with actual image URL\". The JSON must be directly parsable by standard JSON.parse()."

export const AI_PROMPT = `Generate a complete travel plan for Location: {location}, for {totalDays} days for {traveler}, with a {budget} budget. 

Return STRICTLY in this EXACT JSON format:
{
  "hotels": [
    {
      "HotelName": "string",
      "HotelAddress": "string (must contain {location} city name)",
      "Price": "string",
      "HotelImageURL": "string",
      "GeoCoordinates": "string",
      "Rating": "string",
      "Description": "string (mention proximity to {location} attractions)"
    }
  ],
  "itinerary": [
    {
      "day": "Day 1",
      "plan": [
        {
          "PlaceName": "string",
          "PlaceDetails": "string",
          "PlaceImageURL": "string",
          "GeoCoordinates": "string",
          "TicketPricing": "string",
          "TravelTime": "string",
          "time": "9:00 AM - 10:30 AM"
        }
      ]
    }
  ]
}

STRICT RULES:
1. Hotel Requirements:
   - All 4 hotels MUST be physically located in {location} city
   - HotelAddress must contain {location} city name (e.g., "123 Street, {location}")
   - Description must mention specific {location} landmarks/areas
   - Prohibited: Chains with "[City Name]" placeholder (e.g., "Four Seasons {location}")

2. Key Enforcement:
   - EXACT keys: "hotels" (not "hotelOptions") and "itinerary"
   - Case-sensitive spelling: "HotelName" (not "hotelName"), "Price" (not "price")

3. Data Validation:
   - Reject any hotel not physically in {location}
   - GeoCoordinates must use "{location}"-style format (e.g., "22.4744° N, 70.0717° E")
   - Prices in {location}'s local currency (e.g., "INR" for Indian locations)

4. Structural Requirements:
   - Exactly 4 hotels, 3-4 places/day
   - No markdown/formatting in strings
   - Real image URLs (no "[...]" placeholders)

Return ONLY the JSON. No extra text or formatting.`

// export const AI_PROMPT = `You are a professional travel planner specializing in {location}. Generate a complete travel plan for Location: {location}, for {totalDays} days for {traveler}, with a {budget} budget.

// CRITICAL LOCATION REQUIREMENTS:
// - EVERY hotel must be physically located within {location} city limits
// - EVERY attraction must be located in or immediately adjacent to {location}
// - Use actual street addresses, not generic descriptions
// - All recommendations must be verifiable and currently operational

// Return STRICTLY in this EXACT JSON format:
// {
//   "hotels": [
//     {
//       "HotelName": "Actual hotel name (no generic chains like 'Four Seasons {location}')",
//       "HotelAddress": "Complete street address including {location}, State/Province, Country",
//       "Price": "Exact price range in local currency",
//       "HotelImageURL": "Real hotel website URL or booking platform image",
//       "GeoCoordinates": "Precise coordinates in decimal format (e.g., 40.7589° N, 73.9851° W)",
//       "Rating": "Current rating from major platforms",
//       "Description": "Specific description mentioning exact {location} neighborhoods and nearby landmarks"
//     }
//   ],
//   "itinerary": [
//     {
//       "day": "Day 1",
//       "plan": [
//         {
//           "PlaceName": "Exact name of attraction/place in {location}",
//           "PlaceDetails": "Specific details about this {location} location",
//           "PlaceImageURL": "Real image URL from official sources",
//           "GeoCoordinates": "Precise coordinates within {location} boundaries",
//           "TicketPricing": "Current admission fees in local currency",
//           "TravelTime": "Realistic travel time from previous location",
//           "time": "Specific time range (e.g., 9:00 AM - 10:30 AM)"
//         }
//       ]
//     }
//   ]
// }

// VALIDATION CHECKLIST - VERIFY EACH ITEM:
// ✓ Hotel names are real establishments in {location}
// ✓ Hotel addresses contain actual street names in {location}
// ✓ All attractions exist and are currently open in {location}
// ✓ Coordinates fall within {location} geographic boundaries
// ✓ Prices reflect current {location} market rates
// ✓ Travel times are realistic for {location} transportation

// PROHIBITED CONTENT:
// ❌ Generic hotel chains without specific location
// ❌ Placeholder text like "[Hotel Image URL]" or "[City Name]"
// ❌ Attractions from other cities
// ❌ Outdated or fictional establishments
// ❌ Vague addresses like "Downtown {location}"

// LOCATION VERIFICATION:
// Before including ANY recommendation, confirm it exists in {location} by cross-referencing multiple sources. If uncertain about a location's existence or current status, exclude it entirely.

// Return ONLY the JSON. No explanations, markdown, or additional text.`