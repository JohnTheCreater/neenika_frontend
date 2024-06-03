import LOGO from '../../file-removebg-preview.png';
function LogoImg() {
    return <img src={LOGO} className='w-20' alt='logo'/>;
  }
  
  function CName(){
    return <h1 className='flex items-center'>Neenikaa</h1>;
  }

 export   default function Logo() {
    return(
        <div className="flex gap-4">
            <LogoImg/>
            <CName/>
        </div>
    )
  }
