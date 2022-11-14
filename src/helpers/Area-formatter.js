const formatearArea = (area) => {
    if(area.toLowerCase() === "Miembros de Junta".toLowerCase()) {
        return "MIEMBROSJUNTA"
    }else if(area.toLowerCase() === "Legales".toLowerCase()) {
        return "LEGALES"
    }else if(area.toLowerCase() === "Secretaria".toLowerCase()) {
        return "SECRETARIA"
    }else if(area.toLowerCase() === "Mesa de Entrada".toLowerCase()) {
        return "MESAENTRADA"
    }
}

module.exports = { formatearArea }