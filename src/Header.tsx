import { NavLink } from 'react-router-dom';

const Header = () => {
  function toggle(){
    const menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("hidden");
  }

  return (
    <div className="pt-4 mb-20 border-b top-0 z-50">
    <nav>
        <div className="max-w-6xl mx-auto px-4 lg:text-2xl">
            <div className="flex justify-between">
                <div className="flex items-center space-x-1">
                    <a href="/"
                            className="py-4 px-2 font-semibold transition duration-300">
                                Home
                    </a>
                    <a href="/card"
                            className="py-4 px-2 font-semibold transition duration-300">
                                Card
                    </a>
                    <a href="/barchart"
                            className="py-4 px-2 font-semibold transition duration-300">
                                BarChart
                    </a>
                    <a href="/tidytree"
                            className="py-4 px-2 font-semibold transition duration-300">
                                TidyTree
                    </a>
                    <a href="/ctree"
                            className="py-4 px-2 font-semibold transition duration-300">
                                CardTree
                    </a>
                    <a href="/mcircle"
                            className="py-4 px-2 font-semibold transition duration-300">
                                MagicCircle
                    </a>
                    <a href="/statictree"
                            className="py-4 px-2 font-semibold transition duration-300">
                                StaticTree
                    </a>
                    <a href="/olddnt"
                            className="py-4 px-2 font-semibold transition duration-300">
                                OldDataNewTree
                    </a>
                    <a href="/dc"
                            className="py-4 px-2 font-semibold transition duration-300">
                                DynamicCard
                    </a>
                </div>
            </div>
        </div>
    </nav>
</div>
  )
}

export default Header