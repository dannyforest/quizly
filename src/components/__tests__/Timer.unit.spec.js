import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Timer from "../Timer.vue";

describe("seconds", () => {
  it("calculates the right amount of seconds", () => {
    const wrapper = mount(Timer, {
      props: {
        duration: 500
      }
    });
    expect(wrapper.vm.seconds).toEqual(20);
  });
});
