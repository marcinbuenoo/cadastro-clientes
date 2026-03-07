import { Router, Request, Response } from "express";
import Cliente from "../models/Cliente";

const router = Router();

router.post("/", async (req: Request, res: Response ) => {
    try {
        const novoCliente = new Cliente(req.body);
        const clienteSalvo = await novoCliente.save();
        res.status(201).json(clienteSalvo);
    } catch (erro: unknown) {
        if ( erro instanceof Error ) {
            res.status(400).json({ erro: erro.message });
        } else {
            res.status(400).json({ erro: String(erro )});
        }
    }
});

router.get("/", async (req: Request, res: Response ) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch ( erro: unknown ) {
        if ( erro instanceof Error ) {
            res.status(500).json({ erro: erro.message });
        } else {
            res.status(500).json({ erro: String( erro )});
        }
    }
});

router.post("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const clienteAtualizado = await Cliente.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!clienteAtualizado) {
            return res.status(404).json({ erro: "Cliente não encontrada" });
        }

        res.json(clienteAtualizado);
    } catch ( erro: unknown ) {
        if ( erro instanceof Error ) {
            res.status(400).json({ erro: erro.message });
        } else {
            res.status(400).json({ erro: String(erro) });
        }
    }
});

router.delete("/:id", async (req: Request, res: Response ) => {
    try {
        const { id } = req.params;
        const clienteRemovido = await Cliente.findByIdAndDelete(id);

        if (!clienteRemovido) {
            return res.status(404).json({ erro: "Cliente não encontrado" });
        }

        res.json({ message: "Cliente excluído com sucesso" });
    } catch ( erro: unknown ){
        if ( erro instanceof Error ) {
            res.status(400).json({ erro: erro.message });
        } else {
            res.status(400).json({ erro: String( erro ) });
        }
    }
});

export default router;