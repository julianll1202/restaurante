import {  ScrollArea, Table } from '@mantine/core';
import { PropTypes } from 'prop-types';
function Tabla ({headers, content}) {
    return(

        <ScrollArea w="80vw" h="50vh" mah={500} maw={1200} type='always' >
            <Table highlightOnHover stickyHeader withRowBorders borderColor='black' horizontalSpacing='xs' verticalSpacing='xs' id='tabla'>
                <Table.Thead bg='#D9D9D9'>
                    <Table.Tr>
                        { headers.map( (head, index) => <Table.Th ta='center' key={index}>{head}</Table.Th>) }
                    </Table.Tr>
                </Table.Thead>
                {
                <Table.Tbody>
                    { content.map( (fila, index) => <Table.Tr key={index} >
                        {
                            fila.map( (celda, i) => <Table.Td key={i}>{celda}</Table.Td>)
                        }
                        </Table.Tr>
                    )}
                </Table.Tbody>
            }
            </Table>
        </ScrollArea>
    );
}

Tabla.propTypes = {
    headers : PropTypes.array,
    content : PropTypes.array,
};
export default Tabla;
