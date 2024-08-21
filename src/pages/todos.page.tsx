import type { BlitzPage } from '@blitzjs/auth';
import Layout from '@/core/layouts/Layout';
import addTodo from '@/features/todos/mutations/addTodo';
import getTodos from '@/features/todos/queries/getTodos';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { Button, Input, List, Loader, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Vertical } from 'mantine-layout-components';
import { Suspense, useState } from 'react';

const Todos = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todos] = useQuery(getTodos, {});
  const [addTodoMutation] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: 'Todo created',
        message: `Todo ${result.title} created`,
        color: 'teal',
      });
    },
  });

  const createTodo = async () => {
    await addTodoMutation({ todoTitle });
  };

  return (
    <Vertical>
      <Input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add todo"
      />
      <Button onClick={createTodo}>Create todo</Button>
      <List>
        {todos.map((todo) => (
          <List.Item key={todo.id}>
            <Text>{todo.title}</Text>
          </List.Item>
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
