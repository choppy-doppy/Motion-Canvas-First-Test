import {makeScene2D, Rect,} from '@motion-canvas/2d';
import {
  all,
  chain,
  createRef,
  easeInOutCubic,
  tween,
  Vector2
} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  const myRect = createRef<Rect>();
  view.fill('#222222');

  view.add(
      <Rect
          ref={myRect}
          x = {400}
          y = {-400}
          width = {200}
          height = {200}
          fill="#7d7dff"
      />,
  );

  yield *
      tween(2, value => {
        myRect().position(
            Vector2.arcLerp(
                new Vector2(700, -700),
                new Vector2(0, 400),
                easeInOutCubic(value),
            ),
        );
      });

  yield* chain(
      myRect().rotation(0, 0).to(360, 1),
      all (
          myRect().width(200, 0).to(300, 1),
          myRect().height(200, 0).to(150, 1),
      ),
      all(
          myRect().width(300, 0).to(100, 0.3),
          myRect().height(150, 0).to(350, 0.4),
          myRect().position.y(400, 0.1).to(-800, 1)
      ),
  );
});
