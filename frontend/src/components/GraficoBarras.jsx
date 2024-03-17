import { BarChart } from '@mantine/charts';
import { PropTypes } from 'prop-types';
function GraficoBarras ({data, datakey, type, series}) {
    return(
        <BarChart
        h={300}
        data={data}
        dataKey={datakey}
        type={type}
        series={series}
      />
    );
}

GraficoBarras.propTypes = {
    data : PropTypes.array,
    datakey : PropTypes.string,
    type : PropTypes.string,
    series : PropTypes.array,
};
export default GraficoBarras;
