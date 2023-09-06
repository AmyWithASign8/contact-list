import {ContactCard} from "./components/Card/Card.tsx";
import {Button, Center, Group, Loader, Modal, SimpleGrid, Text, TextInput, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import { useForm, SubmitHandler } from "react-hook-form"
import {ValidateFunc} from "./utils/contact-scheme.ts";
import ContactsStore from "./store/contactsStore.ts";
import { observer } from "mobx-react-lite";
import {useEffect, useState} from "react";

type Inputs = {
  name: string
  phone: string
}

export const App = observer(() => {
  const [isLoadingState, setIsLoadingState] = useState(false);
  const { createContact } = ContactsStore;
  const { contacts, isLoading, fetchContacts } = ContactsStore;
  useEffect(() => {
    fetchContacts()
  },[])
  const {
    register,
    handleSubmit,
      reset,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoadingState(true);
    createContact(data)
        .then(() => {
          closeModal();
        })
        .finally(() => {
          setIsLoadingState(false);
        });
  };
  const [opened, { open, close }] = useDisclosure(false);
  const closeModal = () => {
    reset();
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Добавление" centered={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label={'Введите имя'} {...register('name', {required: true, minLength: 2, maxLength: 30})}/>
          {errors.name && <Text color={'red'}>{ValidateFunc(errors.name)}!</Text>}
          <TextInput label={'Введите номер телефона'} {...register('phone', {required: true, minLength: 11, maxLength: 11, pattern:/^\d+$/})}/>
          {errors.phone && <Text color={'red'}>{ValidateFunc(errors.phone)}!</Text>}
          <Group position={'center'} mt={10}>
            <Button color={'green'} type={'submit'}>Добавить</Button>
            <Button color={'red'} onClick={closeModal}>Отмена</Button>
          </Group>
        </form>
      </Modal>
      <Group mt={50} ml={100} mr={100} position={'apart'}>
        <Title>Список контактов:</Title>
        <Button size={'md'} color={'green'} onClick={open}>Добавить контакт</Button>
      </Group>
      <Center>
        <SimpleGrid cols={1} mt={10}>
          {isLoading ? <Loader/> : contacts.length > 0 ? (
              contacts.map((obj) => (
                <ContactCard contact={obj}/>
              ))
          ) : <Title>Список контактов пуст</Title>}
        </SimpleGrid>
      </Center>
    </>
  )
});
