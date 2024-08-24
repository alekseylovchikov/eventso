import type { BlitzPage } from '@blitzjs/auth';
import Layout from '@/core/layouts/Layout';
import addTodo from '@/features/todos/mutations/addTodo';
import getTodos from '@/features/todos/queries/getTodos';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { Button, Checkbox, Input, List, Loader, Text } from '@mantine/core';
import { Horizontal, Vertical } from 'mantine-layout-components';
import { Suspense, useState } from 'react';
import toggleTodo from '@/features/todos/mutations/toggleTodo';
import cleanCompleted from '@/features/todos/mutations/cleanCompleted';

const Todo = ({ todo }) => {
  const [$toggleTodo] = useMutation(toggleTodo);

  return (
    <Horizontal>
      <Checkbox
        checked={todo.done}
        onClick={async () => {
          await $toggleTodo({ id: todo.id });
        }}
      />
      <Text>{todo.title}</Text>
    </Horizontal>
  );
};

const Todos = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos] = useQuery(getTodos, {});
  const [$addTodo] = useMutation(addTodo, {});
  const [$cleanCompleted] = useMutation(cleanCompleted, {});

  return (
    <Vertical>
      <Input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add todo"
      />
      <Button onClick={async () => await $addTodo({ todoTitle })}>Create todo</Button>
      <Button onClick={async () => await $cleanCompleted({})}>Clean completed</Button>
      <List>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
          // <List.Item key={todo.id}>
          //   <Text>{todo.title}</Text>
          // </List.Item>
        ))}
      </List>
    </Vertical>
  );
};

export const TodosPage: BlitzPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </Layout>
  );
};

export default TodosPage;
