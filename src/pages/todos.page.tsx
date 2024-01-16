import Layout from '@/core/layouts/Layout';
import addTodo from '@/features/todos/mutations/addTodo';
import getTodos from '@/features/todos/queries/getTodos';
import { BlitzPage } from '@blitzjs/auth';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { Button, List, Loader, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Vertical } from 'mantine-layout-components';
import { Suspense } from 'react';

const Todos = () => {
  const [todos] = useQuery(getTodos, {});
  const [addTodoMutation] = useMutation(addTodo, {
    onSuccess: (result) => {
      notifications.show({
        title: 'Todo created',
        message: `Todo ${result.todoTitle} created`,
        color: 'teal',
      });
    },
  });

  const createTodo = () => {
    addTodoMutation({ todoTitle: 'New Todo' });
  };

  return (
    <Vertical>
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
