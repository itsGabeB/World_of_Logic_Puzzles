type LightProps = {
  on: boolean
  onClick: () => void
}

function Light({ on, onClick }: LightProps) {
  return <button className={on ? 'light on' : 'light off'} onClick={onClick} />
}

export default Light
