import ContactCard from "./components/Card/Card.tsx";
import {Button, Center, Group, Modal, SimpleGrid, Text, TextInput, Title} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import { useForm, SubmitHandler } from "react-hook-form"
import {ValidateFunc} from "./utils/contact-scheme.ts";

type Inputs = {
  name: string
  phone: string
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  const [opened, { open, close }] = useDisclosure(false);
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
            <Button color={'red'} onClick={close}>Отмена</Button>
          </Group>
        </form>
      </Modal>
      <Group mt={50} ml={100} mr={100} position={'apart'}>
        <Title>Список контактов:</Title>
        <Button size={'md'} color={'green'} onClick={open}>Добавить контакт</Button>
      </Group>
      <Center>
        <SimpleGrid cols={1} mt={10}>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
          <ContactCard/>
        </SimpleGrid>
      </Center>
    </>
  )
}

export default App
