import { Table } from '../../../../components';
import { columns, data } from '../../../../components/table/data';

function CourseManager() {
  return (
    <div>
      <h1 className="titlePrimary">Listado de Eventos Creados</h1>
      <Table
        columns={columns}
        data={data}
        onRowClick={(id) => {
          console.log('Clicaste la fila con id:', id);
        }}
      />
    </div>
  );
}

export default CourseManager;
