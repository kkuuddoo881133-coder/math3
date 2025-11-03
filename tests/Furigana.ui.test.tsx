// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import Furigana from "@/components/Furigana";

// 目的: enabled=true のとき、<ruby> が出力されるかを確認
describe("<Furigana />", () => {
  it("enabled=true なら未習漢字を含む辞書語に <ruby> が付く", () => {
    const { container } = render(
      <Furigana
        text={"これは 交換法則 のせつめいです。"}
        enabled={true}
        gradeMax={3}
      />
    );
    expect(container.innerHTML).toContain(
      "<ruby>交換法則<rt>こうかんほうそく</rt></ruby>"
    );
  });

  it("enabled=false なら ruby を付けない", () => {
    const { container } = render(
      <Furigana
        text={"これは 交換法則 のせつめいです。"}
        enabled={false}
        gradeMax={3}
      />
    );
    // 文字列としては存在するが、rubyタグ化されていない想定
    expect(container.innerHTML).not.toContain("<ruby>");
  });
});
