
interface Props {
    card1: JSX.Element,
    card2: JSX.Element,
  }

  const TwoCardsContainer: React.FC<{
    card1_width: string,
    card2_width: string,
    Card1: React.ReactElement<any, any>;
    Card2: React.ReactElement<any, any>;
  }> = ({ card1_width, card2_width, Card1, Card2}) => {
    return (

      <section className="bg-base-200 flex flex-col md:flex-row lg:flex-row place-items-start p-8 lg:px-10 md:px-8 sm:px-8 h-max w-full">
            {/* Card 1, Left  */}
            <div className={`card h-full w-full ${card1_width} bg-base-300 rounded-box place-items-start justify-start`}>
                {Card1}
            </div>
            {/* Divider  */}
            <div className="divider lg:divider-horizontal"></div>
            {/* Card 2, Right  */}
            <div className={`card h-full w-full  ${card2_width} bg-base-300 p-4 rounded-box place-items-start justify-start`}>
                {Card2}
            </div>
        </section>
    )
  }
  
  export default TwoCardsContainer