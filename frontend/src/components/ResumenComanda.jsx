import { Button, Container, Group, Select, Tabs, Text, Textarea } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useState } from "react"
import { Calendar } from "tabler-icons-react"

const ResumenComanda = () => {
    const [activeTab, setActiveTab] = useState('lista')
    const [ fechaCom, setFechaCom] = useState(null)

    return (
        <Container size='lg' w={350} p={15} style={{
            border: '2px solid #D9D9D9',
            borderRadius: '20px'
        }}>
            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List mb={25}>
                    <Tabs.Tab value="lista" color="orange">Lista</Tabs.Tab>
                    <Tabs.Tab value="comanda" color="orange">Comanda</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="lista">
                    <Container bg="#17C653" p='10px 15px' pb={0} style={{
                        borderRadius: '20px'
                    }}>
                        <Group justify="space-between">
                            <Text fw='bold' c="white">Subtotal</Text>
                            <Text fw='bold' c="white">$145.00</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text fw='bold' c="white">IVA (10%)</Text>
                            <Text fw='bold' c="white">$14.50</Text>
                        </Group>
                        <Group justify="space-between">
                            <Text fz='2.2rem' fw='bold' c="white">Total</Text>
                            <Text fz='2.2rem' fw='bold' c="white">$159.50</Text>
                        </Group>
                    </Container>
                </Tabs.Panel>
                <Tabs.Panel value="comanda">
                    <Select label='Mesero' w='95%' styles={{
                        label: {
                            fontWeight: 'bold',
                            textAlign: 'left'
                        }}} />
                    <Group>
                        <Select styles={{
                        label: {
                            fontWeight: 'bold',
                            textAlign: 'left'
                        }}} leftSection='#' ta='left' label='Mesa' w='45%' />
                        <DateTimePicker styles={{
                        label: {
                            fontWeight: 'bold',
                            textAlign: 'left'
                        }}} rightSection={<Calendar strokeWidth={1} />} onChange={setFechaCom} w='45%' withSeconds label='Fecha y hora' />
                    </Group>
                    <Textarea styles={{
                        label: {
                            fontWeight: 'bold',
                            textAlign: 'left'
                        }
                    }} label='Notas adicionales' />
                    <Button mt={10} w='100%'>Crear</Button>
                </Tabs.Panel>
            </Tabs>
        </Container>
    )
}

export default ResumenComanda