import {  ActionIcon, ScrollArea, Table } from '@mantine/core';
import { PropTypes } from 'prop-types';
import { Edit, ListSearch, Trash } from 'tabler-icons-react';
function Tabla ({headers, content, row, rowD}) {
    return(

        <ScrollArea w="80vw" h="50vh" mah={500} maw={1200} type='always'  >
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
                        {
                            fila.map( (celda, i) => <Table.Td key={i}>{celda}</Table.Td>)
                        }
                        <Table.Td>
                            <ActionIcon onClick={() => row(index)} mr={10} size={28} radius='xl' color='light-brown'><ListSearch size={20} /></ActionIcon>
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
};
export default Tabla;
