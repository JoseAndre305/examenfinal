import { NextRequest, NextResponse } from "next/server";
import {conn} from "@/app/utils/db";

export const GET = async (request: NextRequest) => {
    try {
        const qry = "SELECT ig.DIRECCION, ig.CONTACTABILIDAD, ig.INFORMACION_FINANCIERA, ig.FECHA_CREACION, ig.FECHA_ACTUALIZACION, ig.USUARIO_CREADOR, ig.ESTADO_INFORMACION, c.APELLIDOS FROM INFORMACION_GENERAL ig JOIN CLIENTES c ON ig.ID_CLIENTE = c.ID ORDER BY ig.FECHA_CREACION, c.APELLIDOS";
        const resultado = await conn.query(qry);

        if (resultado.rows.length === 0) {
            return NextResponse.json({ message: 'No se encontraron registros' }, { status: 404 });
        }

        return NextResponse.json(resultado.rows);
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
};