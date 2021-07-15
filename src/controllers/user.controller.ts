import { Request, Response } from "express";
import { QueryResult } from "pg";
import { connect } from "../database";
import { User } from "../interface/user.interface";

// Metodo para conseguir todos los usuarios
export async function getUsers(req: Request, res: Response): Promise<Response> {

    try {

        const connection = await connect();

        const usuarios = await connection.query("SELECT * FROM example_express.usuario");

        return res.status(200).json(usuarios.rows);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }

}

//Metodo para eliminar un usuario

export async function deleteUser(req: Request, res: Response) {

    try {

        const id = req.params.id;
        const conn = await connect();

        const response = await conn.query("DELETE FROM example_express.usuario where id= $1", [id]);

        return res.status(200).json({
            message: "Usuario eliminado correctamente"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }

}

//Metodo para conseguir un usuario
export async function getUser(req: Request, res: Response): Promise<Response> {

    try {
        const id = req.params.id;
        const connection = await connect();

        const usuarios = await connection.query("SELECT * FROM example_express.usuario where id = $1", [id]);

        return res.status(200).json(usuarios.rows);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }

}

//Metodo para insertar un usuario
export async function createUser(req: Request, res: Response) {

    try {
        const newUser: User = req.body;

        const connection = await connect();
        //TODO validacion de los datos

        const response: QueryResult = await connection.query('INSERT INTO example_express.usuario (usuario , tipo) values ( $1 , $2)', [newUser.usuario, newUser.tipo]);
        console.log(response);

        return res.json({
            message: 'Usuario creado',
            user: {
                usuario: newUser.usuario,
                tipo: newUser.tipo
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }

}

//Metodo para actualizar el usuario 

export async function updateUser(req:Request , res:Response): Promise<Response> {
    
    try {
        const id = req.params.id;
        const updatedUser = req.body;
        const con = await connect();

        const response = await con.query("UPDATE example_express.usuario set usuario = $1 where id= $2" , [updatedUser.usuario , id]);

        return res.status(200).json({
            message : 'Actualizado correctamente'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
}