export async function GET(request: Request) {
  const response = await fetch('http://localhost:4000/todos');
  const todos = await response.json();

  if (!todos) {
    return new Response('Todo is not found', {
      status: 404,
    });
  }

  return Response.json({
    todos: [...todos],
  });
}

//데이터 추가하기
export async function POST(request: Request) {
  const { title, contents } = await request.json();

  const response = await fetch('http://localhost:4000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ title, contents, isDone: false }),
  });

  const todo = await response.json();

  return Response.json({
    todo,
  });
}

// 데이터 삭제하기
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    return Response.json({
      message: 'Todo change successfully',
    });
  } else {
    return new Response('Failed to delete Todo', {
      status: 500,
    });
  }
}

//데이터 수정하기
export async function PATCH(request: Request) {
  const { isDone } = await request.json();
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  console.log('id', id);

  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ isDone: !isDone }),
  });

  const data = await response.json();

  return Response.json(data);
}
