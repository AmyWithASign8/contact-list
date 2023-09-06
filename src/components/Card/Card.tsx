import {Card, Text, Button, Group, Modal, TextInput} from '@mantine/core';
import {modals} from "@mantine/modals";
import {useDisclosure} from "@mantine/hooks";
import { useForm, SubmitHandler } from "react-hook-form"
import {ValidateFunc} from "../../utils/contact-scheme.ts";

type Inputs = {
    name: string
    phone: string
}

const ContactCard = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    const [opened, { open, close }] = useDisclosure(false);

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: 'Удаление контакта',
            centered: true,
            children: (
                <Text size="sm">
                    Вы уверены что хотите удалить контакт?
                </Text>
            ),
            labels: { confirm: 'Удалить', cancel: "Отмена" },
            confirmProps: { color: 'red' },
            onCancel: () => console.log('Cancel'),
            onConfirm: () => console.log('Confirmed'),
        });
    return (
        <div>
            <Modal opened={opened} onClose={close} title="Добавление" centered={true}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput label={'Введите имя'} {...register('name', {required: true, minLength: 2, maxLength: 30})}/>
                    {errors.name && <Text color={'red'}>{ValidateFunc(errors.name)}!</Text>}
                    <TextInput label={'Введите номер телефона'} {...register('phone', {required: true, minLength: 11, maxLength: 11, pattern:/^\d+$/})}/>
                    {errors.phone && <Text color={'red'}>{ValidateFunc(errors.phone)}!</Text>}
                    <Group position={'center'} mt={10}>
                        <Button type={'submit'}>Сохранить</Button>
                        <Button color={'red'} onClick={close}>Отмена</Button>
                    </Group>
                </form>
            </Modal>
            <Card shadow="xl" padding="lg" radius="md" withBorder>
               <Group>
                   <Group>
                       <Text size={'xl'} weight={500}>Данил</Text>
                       <Text size={'xl'} weight={500}>79173450525</Text>
                   </Group>
                   <Group>
                       <Button onClick={open} variant="filled" color="blue" mt="md" radius="md">
                           Редактировать
                       </Button>
                       <Button onClick={openDeleteModal} variant="filled" color="red" mt="md" radius="md">
                           Удалить
                       </Button>
                   </Group>
               </Group>
            </Card>
        </div>
    );
};

export default ContactCard;