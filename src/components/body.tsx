export const Body: React.FC = () => {
  return (
    <main className="pa4-l bg-snow mw9 mv5 center pa4">
      <h1 className="pa0 f2 ma0 mb4 navy tc">Dial with libp2p</h1>

      <form>
        <label htmlFor="input" className="f5 ma0 pb2 navy fw4 db">PeerId or Multiaddr</label>
        <input
          className="input-reset bn black-80 bg-white pa3 w-100 mb3"
          id="input"
          name="input"
          type="text"
          placeholder="QmFoo.."
          required
        />

        <button
          className="
            button-reset
            pv3
            tc
            bn
            bg-animate bg-black-80
            hover-bg-aqua
            white
            pointer
            w-100
          "
          id="dial-button"
          type="submit"
          // disabled="disabled"
        >
          Dial
        </button>
      </form>
      <div className="window">
        <div id="terminal" className="terminal">
          <div id="output"></div>
        </div>
      </div>
    </main>
  )
}
