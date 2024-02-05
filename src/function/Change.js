import imageCompression from 'browser-image-compression';
import * as XLSX from 'xlsx'
import { sleep } from './Minor';

const handleChangeFoto = async (selectedFile) => {
    var foto = {}
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 720
    }
    const compressedFile = await imageCompression(selectedFile, options);
    if (compressedFile) {
        let reader = new FileReader()
        reader.readAsDataURL(compressedFile)
        reader.onload = (e) => {
            foto = {
                url: e.target.result,
                file: compressedFile
            }
        }
    }
    else {
        foto = null
    }
    await sleep(200)
    return (foto)
}

const handleChangeExcel = async(selectedFile) => {
    var data = {}
    if (selectedFile) {
        let reader = new FileReader()
        reader.readAsArrayBuffer(selectedFile)
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'buffer' })
            const worksheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[worksheetName]
            data = XLSX.utils.sheet_to_json(worksheet)
        }
    }
    else {
        data = null
    }
    await sleep(300)
    return (data)
}

export {
    handleChangeFoto,
    handleChangeExcel
};