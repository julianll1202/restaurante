import {  ActionIcon, Avatar, Badge, ScrollArea, Table } from '@mantine/core';
import { PropTypes } from 'prop-types';
import { Edit, ListSearch, Trash } from 'tabler-icons-react';
import { STORED_IMAGES_URL } from '../utils/constants';
function Tabla ({headers, content, row, rowD, useImage, useDetailView, useBadge}) {
    return(

        <ScrollArea w="90%" h="50vh" mah={500} maw={1200} type='always' ml='-8vw' >
            <Table highlightOnHover stickyHeader withRowBorders borderColor='black' horizontalSpacing='xs' verticalSpacing='xs' id='tabla'>
                <Table.Thead bg='#D9D9D9'>
                    <Table.Tr>
                        { headers.map( (head, index) => <Table.Th ta='center' key={index}>{head}</Table.Th>) }
                        <Table.Th></Table.Th>
                    </Table.Tr>
                </Table.Thead>
                {
                <Table.Tbody>
                    { content.length > 0 ? content.map( (fila, index) => <Table.Tr key={index} >
                        { useImage ?
                            fila.map( (celda, i) => i === 0 ? <Table.Td ta='center' key={i}><Avatar src={`${STORED_IMAGES_URL}${celda}`} /></Table.Td> : <Table.Td ta='center' key={i}>{celda}</Table.Td>)
                            :
                            fila.map( (celda, i) => i === 3 ? <Table.Td ta='center' key={i}><Badge variant='light' color='orange' size='lg' radius='sm'>{celda}</Badge></Table.Td> : <Table.Td ta='center' key={i}>{celda}</Table.Td>)
                        }
                        <Table.Td>
                            { useDetailView ? <ActionIcon onClick={() => row(index)} mr={10} size={28} radius='xl' color='light-brown'><ListSearch size={20} /></ActionIcon> : null}
                            <ActionIcon onClick={() => row(index)} size={28} mr={10} radius='xl'><Edit size={20} /></ActionIcon>
                            <ActionIcon onClick={() => rowD(index)} color='red' size={28} radius='xl'><Trash size={20} /></ActionIcon>
                        </Table.Td>
                        </Table.Tr>
                    ) : <Table.Tr><Table.Td></Table.Td></Table.Tr>}
                </Table.Tbody>
            }
            </Table>
        </ScrollArea>
    );
}

Tabla.propTypes = {
    headers : PropTypes.array,
    content : PropTypes.array,
    row: PropTypes.func,
    rowD: PropTypes.func,
    useDetailView: PropTypes.bool,
    useImage: PropTypes.bool,
    useBadge: PropTypes.bool,
};
export default Tabla;
