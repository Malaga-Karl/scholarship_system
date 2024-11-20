import pdf from '../../assets/pdf/testpdf.pdf';

export default function PDFElement(){
    return(
        <>
            <h1>hello</h1>
            <iframe src={pdf} width="500%" height="500%"></iframe>
        </>
        
    )
}