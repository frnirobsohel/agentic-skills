# Laravel Coding Conventions & Query Optimization

Follow Laravel's standard conventions to build high-performance, maintainable web applications.

---

## 1. Controller & Service Architecture

Maintain clean controller actions by separating business logic from validation and controller routing:

* **Thin Controllers:** Controllers should only route input, invoke a service method, and return a response.
* **Form Requests:** Move input validation out of controllers into custom Form Request classes:
  ```php
  // Generate using: php artisan make:request StoreUserRequest
  public function store(StoreUserRequest $request): JsonResponse
  {
      $user = $this->userService->createUser($request->validated());
      return response()->json(new UserResource($user), 201);
  }
  ```
* **Services Layer:** House complex business logic in separate service classes under `app/Services/`.

---

## 2. Eloquent Database Optimization

Eloquent makes querying database easy, but can lead to severe performance bottlenecks:

### Prevent the N+1 Query Problem
When rendering a list of models with their relationships, always eager-load relations using `with()` to prevent executing a separate SQL query for each relation:

```php
// Bad (Executes 1 query for posts + N queries to fetch author for each post)
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name;
}

// Good (Executes only 2 queries: one for posts, one for authors)
$posts = Post::with('author')->get();
```

### Select Only Required Columns
Avoid `SELECT *` on large tables. Select only the columns needed by the view or API:
```php
$users = User::select(['id', 'name', 'email'])->get();
```

### Bulk Operations
Use `insert()`, `update()`, or `upsert()` for multi-row edits instead of iterating and saving individual Eloquent models in a loop.

---

## 3. Dependency Injection & Service Container

Leverage Laravel's powerful Service Container instead of manually instantiating classes:

```php
// Inject dependencies directly into controller constructors or action methods
class PostController extends Controller
{
    public function __construct(
        protected PostService $postService
    ) {}

    public function show(int $id): JsonResponse
    {
        $post = $this->postService->getPost($id);
        return response()->json(new PostResource($post));
    }
}
```
