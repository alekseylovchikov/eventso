import type { BlitzPage } from '@blitzjs/auth';
import Layout from '@/core/layouts/Layout';
import addTodo from '@/features/todos/mutations/addTodo';
import getTodos from '@/features/todos/queries/getTodos';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { Button, Checkbox, Input, List, Text } from '@mantine/core';
import { Horizontal, Vertical } from 'mantine-layout-components';
import { useState } from 'react';
import toggleTodo from '@/features/todos/mutations/toggleTodo';
import cleanCompleted from '@/features/todos/mutations/cleanCompleted';
import { ReactFC } from '~/types';
import { PromiseReturnType } from 'blitz';

type Todos = PromiseReturnType<typeof getTodos>;

type Props = {
  todo: Todos[number];
};

const Todo: ReactFC<Props> = ({ todo }) => {
  const [$toggleTodo, { isLoading }] = useMutation(toggleTodo);

  return (
    <Horizontal>
      <Checkbox
        disabled={isLoading}
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
  const [$addTodo, { isLoading: addTodoIsLoading }] = useMutation(addTodo, {});
  const [$cleanCompleted, { isLoading: cleanCompletedIsLoading }] = useMutation(cleanCompleted, {});

  return (
    <Vertical>
      <Input
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        placeholder="Add todo"
      />
      <Button loading={addTodoIsLoading} onClick={async () => await $addTodo({ todoTitle })}>
        Create todo
      </Button>
      <Button loading={cleanCompletedIsLoading} onClick={async () => await $cleanCompleted({})}>
        Clean completed
      </Button>
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
      <Todos />
    </Layout>
  );
};

export default TodosPage;
