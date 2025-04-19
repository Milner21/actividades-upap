import { columns, data } from "../../../../components/table/data";
import Table from "../../../../components/table/Table";

function CourseManager() {
    return (
        <div>
            <h1 className="titlePrimary">Listado de Eventos Creados</h1>
            <Table columns={columns} data={data}/>
        </div>
    );
}

export default CourseManager;