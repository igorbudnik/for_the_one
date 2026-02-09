import mainStyle from "./Valentine.module.css";
import fire1 from "../photos/fire1.png";
import fire2 from "../photos/fire2.png";
import fire3 from "../photos/fire3.png";
import me from "../photos/me.jpg";

function Valentine() {
  return (
    <div className={mainStyle.main}>
      <img class={`${mainStyle.first} shake-tiny-all`} src={fire1} />
      <img class={`${mainStyle.second} shake-tiny-all`} src={fire2} />
      <img
        class={`${mainStyle.third} shake-tiny-all`}
        src={fire3}
        width={350}
        height={350}
      />
      <img
        class={`${mainStyle.second_2} shake-tiny-all`}
        src={fire2}
        width={350}
        height={350}
      />
      <img
        class={`${mainStyle.first_2} shake-tiny-all`}
        src={fire1}
        width={350}
        height={350}
      />
      <img
        class={`${mainStyle.third_2} shake-tiny-all`}
        src={fire3}
        width={300}
        height={300}
      />
      <section className={mainStyle.main_block}>
        <div className={mainStyle.area}>
          <section className={mainStyle.inner_block}>
            <span class={mainStyle.main_text}>❤️ Упали от радости!!! ❤️</span>
            <img
              class={mainStyle.img}
              src={me}
              alt={"murrrr"}
              width={420}
              height={540}
            />
          </section>
        </div>
      </section>
    </div>
  );
}

export default Valentine;
