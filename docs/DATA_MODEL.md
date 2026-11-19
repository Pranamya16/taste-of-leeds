# Proposed data model

This is a planning document. The database is not created yet. Start with a small model and expand only when the basic website works.

## Food spots

| Field | Suggested type | Purpose |
|---|---|---|
| id | UUID | Unique record ID |
| name | text | Public business name |
| description | text | Short introduction |
| address | text | Street address |
| neighbourhood | text | Area of Leeds |
| website_url | text, optional | Official website |
| price_band | text, optional | Approximate price indicator |
| dietary_options | text array, optional | Options reported by the business |
| status | text | draft, pending, published, rejected |
| created_at | timestamp | Creation time |

## Cuisines

| Field | Suggested type | Purpose |
|---|---|---|
| id | UUID | Unique record ID |
| name | text | Cuisine or regional tradition |
| description | text, optional | Context and description |

A food spot may be associated with more than one cuisine or regional tradition. A join table can represent that relationship.

## Reviews and stories

| Field | Suggested type | Purpose |
|---|---|---|
| id | UUID | Unique record ID |
| food_spot_id | UUID | Related food spot |
| user_id | UUID, optional initially | Author account |
| recommended_dish | text | Dish the reviewer suggests |
| experience | text | First-hand experience |
| cuisine_connection | text, optional | Voluntary self-description |
| would_recommend | text, optional | yes, maybe, no |
| status | text | pending, published, rejected |
| created_at | timestamp | Submission time |

## Important design decisions

- Do not ask users to disclose ethnicity, nationality or other sensitive personal information.
- Let people describe their own connection to a cuisine voluntarily.
- Do not calculate a universal authenticity score.
- Keep submissions pending until reviewed in the first version.
- Use access controls so users cannot edit or delete other people's submissions.
- Store only the information needed to run the service.
