interface Props {
  children: React.ReactNode;
  message: string;
  messageButton: string;
  linkbutton: string;
  showButton: boolean;
  type: "success" | "error" | "warning";
}

export const HeaderNotify = ({}) => {
  return (
    <div className="bg-[#005f44] h-14 text-base flex items-center justify-center gap-4 text-center">
      <h4>Parabéns! Você foi aprovado, que tal agora</h4>
      <button className="border-1 border-white rounded-lg bg-transparent items-center text-sm hover:bg-white hover:text-black transition-all justify-center text-center p-1.5">
        Agendar minha entrevista  
      </button>
    </div>
  );
};
